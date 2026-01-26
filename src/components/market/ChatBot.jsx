import ChatBot from "react-chatbotify";
import chatBotApi from "../../configs/ChatBotApi";
import logo from "../../assets/logo2.png";

export default function ShopChatBot({ onAddToCart, onSearch }) {

    const flow = {
        start: {
            message: "Chào bạn, mình có thể giúp gì cho bạn?",
            path: "chat"
        },

        chat: {
            message: async ({ userInput }) => {
                const res = await chatBotApi.requestFromUser(userInput);

                switch (res.action) {
                    case "ADD_TO_CART":
                        onAddToCart(res.payload);
                        break;

                    case "SEARCH_PRODUCT":
                        onSearch(res.payload.keyword);
                        break;
                    default:
                        break;
                }

                return res.text.trim() || "Mình chưa hiểu yêu cầu của bạn.";
            },
            path: "chat"
        }
    };

    return (
        <ChatBot
            flow={flow}
            settings={{
                botName: "Mộc Mơ",
                header: {
                    title: "Mộc Mơ ChatBot",
                    avatar: logo,
                    showAvatar: true,
                },
                footer: {
                    text: ''
                },
                chatHistory: {
                    disabled: false
                },
                botBubble: {
                    avatar: logo,
                    showAvatar: true,
                },
                chatButton: {
                    icon: logo
                },
                general: {
                    primaryColor: '#21f367',
                    secondaryColor: '#23d35e'
                }
            }}
        />
    );
}

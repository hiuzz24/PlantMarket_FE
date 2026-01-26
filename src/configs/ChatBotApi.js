import publicApi from "./PublicApi"

const chatBotApi = {
    requestFromUser: async (message) => {
        const res = await publicApi.post("/chatbot/chat",
            { 'userRequest': message },
        );
        console.log(res.data);
        
        return res.data;
    }
}
export default chatBotApi;
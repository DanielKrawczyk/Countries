export default class API {
    static async GET( url: string ): Promise<any> {

        const res = await fetch( url );

        const data = res.json();

        return data;
        
    }
}
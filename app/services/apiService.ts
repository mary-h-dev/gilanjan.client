import { getAccessToken } from "../lib/actions";




const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);

        const token = await getAccessToken();

        // تنظیم هدرها
        let headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        // اضافه کردن هدر Authorization در صورت وجود توکن
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }



        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },



    post: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        const token = await getAccessToken();

        let headers: any = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: headers
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },





    postWithoutToken: async function(url: string, data: any): Promise<any> {
        console.log('post', url, data);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }
}

export default apiService;




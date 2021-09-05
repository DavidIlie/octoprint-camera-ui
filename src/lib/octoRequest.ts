import axios from "axios";

export const octoRequest = async (path: string) => {
    return await axios.get(`${process.env.OCTO_PRINT_URL}${path}`, {
        headers: { "X-Api-Key": process.env.OCTO_PRINT_API_KEY },
    });
};

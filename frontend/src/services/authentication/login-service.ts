import { axiosConfig } from "../../config/axios.config";

class AnswersService {
  static createAnswer = async (data: any, id: string) => {
    const cancelAnswers = axiosConfig
      .post(`users`, data, {})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    return cancelAnswers;
  };
}

export default AnswersService;

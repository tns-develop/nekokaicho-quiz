import QuizInfoType from '../types/quizInfoType';
import {quisInfoList} from '../../resources/data/quizInfoData';

// quisInfoObjからsubjectとcounterに合致するデータを取得
const getQuizInfo = (subject: string | null, counter: number| 1) =>{
  return quisInfoList.filter((quizInfo:QuizInfoType) => {
    return quizInfo.subject === subject && quizInfo.counter === counter;
  });
}

export default getQuizInfo;
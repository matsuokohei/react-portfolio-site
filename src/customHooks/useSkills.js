import { useEffect, useReducer, useCallback } from "react";
import axios from 'axios'
import { skillReducer, initialState, actionTypes } from "../reducers/skillReducer";
import { requestStates } from "../constants";

export const useSkills = () => {

  const [state, dispatch] = useReducer(skillReducer, initialState);

  const generateLanguageCountObj = useCallback((allLanguageList) => {
    const notNullLanguageList = allLanguageList.filter(language => language != null);
    const uniqueLanguageList = [...new Set(notNullLanguageList)]
    return uniqueLanguageList.map(item => ({
      language: item,
      count: allLanguageList.filter(language => language === item).length
    }));
  }, []);

  const fetchReposApi = useCallback(() => {
    axios.get('https://api.github.com/users/matsuokohei/repos')
      .then((response) => {
        const languageList = response.data.map(res => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({type: actionTypes.success, payload: {languageList: countedLanguageList}});
      })
      .catch(() => {
        dispatch({type: actionTypes.error});
      });
  }, [dispatch, generateLanguageCountObj]);

  useEffect(() => {
    if (state.requestState !== requestStates.loading) return;
    fetchReposApi();
  }, [state.requestState, fetchReposApi]);

  useEffect(() => dispatch({type: actionTypes.fetch}), [])

  const DEFAULT_MAX_PERCENTAGE = 100;
  const LANGUAGE_COUNT_BASE = 10;

  const convertCountToPercentage = (languageCount) => {
    if (languageCount > LANGUAGE_COUNT_BASE) return DEFAULT_MAX_PERCENTAGE;
    return languageCount * LANGUAGE_COUNT_BASE;
  };

  const sortedLanguageList = () => (
    state.languageList.sort((firstLang, nextLang) => nextLang.count - firstLang.count)
  )

  return [sortedLanguageList, state.requestState, convertCountToPercentage];

};
'use server';

import { TargetLanguageCode, Translator } from 'deepl-node';

const translator = new Translator(process.env.DEEPL_API_KEY as string);

const translate = async (
  text: string,
  target: TargetLanguageCode,
): Promise<{
  translation: string;
  src: string;
}> => {
  const result = await translator.translateText(text, null, target);
  return {
    translation: result.text,
    src: result.detectedSourceLang,
  };
};

export default translate;

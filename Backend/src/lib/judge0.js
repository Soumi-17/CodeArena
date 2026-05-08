import axios from "axios";

const JUDGE0_API = "http://54.243.229.182:2358";

const LANGUAGE_IDS = {
    python3: 71,
    nodejs: 63,
    cpp17: 54,
    c: 50,
    java: 62,
    sql: 82,
  };

const submitCode = async ({ source_code, language_id, stdin = "" }) => {
  try {
    const response = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        source_code,
        language_id,
        stdin,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Judge0 Error:", error.message);
    throw error;
  }
};

export {
  submitCode,
  LANGUAGE_IDS,
};
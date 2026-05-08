import express from "express";
import { submitCode, LANGUAGE_IDS } from "../api/judge0.js";

const router = express.Router();

router.post("/run", async (req, res) => {
  try {
    const { code, language, input } = req.body;

    const language_id = LANGUAGE_IDS[language];

    if (!language_id) {
      return res.status(400).json({
        success: false,
        message: "Unsupported language",
      });
    }

    const result = await submitCode({
      source_code: code,
      language_id,
      stdin: input,
    });

    return res.json({
      success: true,
      data: {
        stdout: result.stdout,
        stderr: result.stderr,
        compile_output: result.compile_output,
        status: result.status,
        time: result.time,
        memory: result.memory,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Code execution failed",
    });
  }
});

export default router;
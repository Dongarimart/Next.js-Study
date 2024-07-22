import { promises } from 'dns';
import fs from 'fs/promises';

const file = 'public/progressData.json';

interface Progress {
  progress: number;
  icon: string;
}

interface ProgressPeople {
  [key: string]: Progress;
}

const progressSample: ProgressPeople = {
  hoon: {
    progress: 1,
    icon: "🦀"
  },
  jhyun: {
    progress: 1,
    icon: "⛄"
  },
  seungjae: {
    progress: 1,
    icon: "🖐️"
  },
  tae: {
    progress: 1,
    icon: "🍕"
  }
}

/**
 * 데이터 파일이 존재하는지 확인 후 없다면 초기화합니다.
 */
const initFile = async () => {
  try {
    await fs.access(file, fs.constants.F_OK);
  } catch (err) {
    console.error(err);
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.writeFile(file, JSON.stringify(progressSample));
      console.info(`[Next.js-Study/${file}이 존재하지 않아 파일을 생성하였습니다.]`);
    }
  }
}

/**
 * 데이터 파일을 읽어 반환합니다.
 * @returns {ProgressPeople}
 */
const getFile = async (): Promise<ProgressPeople> => {
  await initFile();

  const content: ProgressPeople = await JSON.parse(await fs.readFile(file, 'utf-8'));

  return content;
}

/**
 * GET /api/progress |
 * Progress 데이터를 읽어옵니다.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export async function GET(request: Request): Promise<Response>{
  try {
    const resBody = await getFile();
    return new Response(JSON.stringify(resBody), {
      status: 200,
    })
  } catch (err) {
    console.error(err);
    return new Response('서버 에러 발생', {
      status: 500,
    })
  }
}

/**
 * POST /api/progress |
 * 한명의 Progress 데이터를 저장합니다.
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export async function POST(request: Request): Promise<Response> {
  interface PostProgress {
    name: string;
    progress: number;
  }

  await initFile();

  try {
    const body: PostProgress = await request.json();

    const { name, progress } = body;

    if ( !name || !progress ) {
      return new Response(`name 또는 progress가 누락되었습니다.`, {
        status: 400,
      })
    }

    if ( progress < 1 || 10 < progress) {
      return new Response(`progress는 1~10이어야 합니다.`, {
        status: 400,
      })
    }

    if ( !(['hoon', 'jhyun', 'seungjae', 'tae'].includes(name)) ) {
      return new Response(`name은 'hoon', 'jhyun', 'seungjae', 'tae' 중 하나여야 합니다.`, {
        status: 400,
      })
    }

    const newProgress: ProgressPeople = await getFile();

    newProgress[name].progress = progress;

    try {
      await fs.writeFile(file, JSON.stringify(newProgress));
    } catch (err) {
      console.error(err);
      return new Response('서버 에러 발생', {
        status: 500,
      })
    }

    return new Response(JSON.stringify(newProgress), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response('서버 에러 발생', {
      status: 500,
    })
  }
}
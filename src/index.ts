import { render } from './renderer';

// 定义 Worker 的环境变量类型
export interface Env {
  MYBROWSER: any;
}

// 定义 API 请求体的结构
interface RenderRequestBody {
  template: string;
  data: Record<string, any>;
  outputType?: 'base64' | 'buffer'; // 允许客户端指定输出类型
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Expected POST request', { status: 405 });
    }

    try {
      // 解析请求体，并为 outputType 设置默认值 'buffer'
      const { template, data, outputType = 'buffer' } = await request.json<RenderRequestBody>();

      if (!template || !data) {
        return new Response('Missing "template" or "data" in request body', { status: 400 });
      }

      // 将客户端指定的 outputType 传递给 render 函数
      const result = await render(env.MYBROWSER, template, data, outputType);

      // 1. 处理单个 base64 字符串的返回
      if (typeof result === 'string') {
        // 将 base64 字符串包装在 JSON 对象中返回
        const payload = {
          code: '0',
          data: result,
        };
        return Response.json(payload);
      }

      // 2. 处理 Buffer (默认情况)，直接返回图片
      return new Response(result, {
        headers: {
          'Content-Type': 'image/png'
        },
      });

    } catch (e: any) {
      console.error('API Error:', e);
      return new Response(`Error during rendering: ${e.message}`, { status: 500 });
    }
  },
};
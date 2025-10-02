import { launch, Browser, ScreenshotOptions } from '@cloudflare/puppeteer';
import mustache from 'mustache';

type OutputType = 'base64' | 'buffer';

/**
 * render | 使用 Cloudflare Browser Rendering 渲染 HTML 模板并截图。
 *
 * @param {any} binding - Cloudflare Worker 环境中绑定的 Browser Rendering 服务实例。
 * @param {string} template - 包含 Mustache 标签的 HTML 模板字符串。
 * @param {Record<string, any>} data - 用于填充模板的 content 对象。
 * @param {OutputType} [outputType='buffer'] - 'base64' 或 'buffer'。
 * @returns {Promise<string | Buffer>} 截图的 Base64 字符串、Buffer 或 Base64 字符串数组（分片截图时）。
 */
export async function render(
  binding: any,
  template: string,
  data: Record<string, any>,
  outputType: OutputType = 'buffer'
): Promise<string | Buffer> {
  if (!binding) {
    throw new Error('Cloudflare Browser Rendering binding is required.');
  }

  let browser: Browser | null = null;
  try {
    browser = await launch(binding);

    if (data.list) {
      data.list = JSON.stringify({ data: data.list });
    }
    const html = mustache.render(template, data);

    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080
    });
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    const options: ScreenshotOptions = {
      type: 'png',
      omitBackground: false,
    };
    if (outputType === 'base64') {
      options.encoding = 'base64';
    }

    const body = await page.$('#container');
    if (!body) {
      throw new Error('未找到 #container 元素');
    }
    const result = await body.screenshot(options);
    
    await page.close().catch((err) => console.error('Error closing page:', err));
    
    if (typeof result === 'string') {
      return result;
    }
    return Buffer.from(result);

  } catch (error) {
    console.error('[Render][renderer] Puppeteer 渲染出错:', error);
    throw new Error('渲染 HTML 时出错');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
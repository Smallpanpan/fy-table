/**
 * 日志输出
 *  日志五元组：“时间、模块、对象、事件、结果”
 */
// 获取启动环境的环境变量
const env = process.env.NODE_ENV
const config =  () => {
        let log = {
            development: ['trace','debug','error','warn','info'],
            test: ['error','warn'],
            production: ['error'],
        }
        return log[env]
    };

//获取当前时间
function getNowTime() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
 }

 function LOG(logFn, params) {
    const time = getNowTime();
    let {
        module = '',
        obj = '',
        event = '',
        msg = '',
        suggest = ''
    } = params
    // 针对不同环境输出不同控制日志输出
    let logFnName = logFn.toString().match(/function\s*([^(]*)\(/)[1];
    if (config().includes(logFnName)) {
      logFn.call(null,`[${time}]-[${module}]-${obj}--[${event}]-[${msg}]--[${suggest}]`);
    }
}
export function TRACE(msg) {
    LOG(console.trace, msg);
}

export function INFO(msg) {
    LOG(console.info, msg);
}

export function WARN(msg) {
    LOG(console.warn, msg);
}
export function error(msg) {
    LOG(console.error, msg);
}
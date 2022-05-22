/**
 * 日志输出
 *  日志五元组：“时间、模块、对象、事件、结果”
 */
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
    if (!msg.devOnly) {
      logFn.call(null,`[${time}]-[${module}]-${obj}--[${event}]-[${msg}]--[${suggest}]`);
    }
}
export function TRACE(msg) {
    LOG(console.trace, msg);
}
export function DEBUG(msg) {
    LOG(console.debug, msg);
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
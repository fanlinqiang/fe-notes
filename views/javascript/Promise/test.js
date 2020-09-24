// https://github.com/Lucifier129/promise-aplus-impl/blob/master/src/index.js
// https://github.com/haizlin/fe-interview/issues/1335
// 三种状态
const PENDING = "pending"; // 进行中
const FULFILLED = "fulfilled"; // 已成功
const REJECTED = "rejected"; // 已失败

/**
 * 可通过Object.getOwnPropertyDescriptors(Promise)、Object.getOwnPropertyDescriptors(Promise.prototype)查看要实现的方法:
 *
 * Promise.prototype.then
 * Promise.prototype.catch
 * Promise.prototype.finally
 * Promise.resolve
 * Promise.reject
 * Promise.all
 * Promise.race
 * Promise.allSettled
 */
function isMyPromise(obj) {
    return obj instanceof MyPromise;
}
const isFunction = obj => typeof obj === 'function'
const toString = Object.prototype.toString
const isObject = obj => toString.call(obj) === '[object Object]'
const isThenable = obj => (isObject(obj) || isFunction(obj)) && 'then' in obj
class MyPromise {
    constructor(excutor) {
        Object.assign(this, {
            status: PENDING,
            value: void(0), // fulfilled状态时 返回的信息
            reason: void(0) // rejected状态时 拒绝的原因
        });
        let onFulfilled = (value) => {

        };
        let onRejected = () => {

        };
        // 一旦状态改变，就不会再变，任何时候都可以得到这个结果。
        let ignore = false;
        // resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
        let resolve = (value) => {
            if (ignore) {
                return;
            }
            ignore = true;

            if (value === this) {
                return onRejected(new TypeError('Can not fufill promise with itself'))
            }
            if (value instanceof MyPromise) {
                return value.then(onFulfilled, onRejected)
            }
            if (isThenable(value)) {
                try {
                    let then = value.then
                    if (isFunction(then)) {
                        return new MyPromise(then.call(value, onFulfilled, onRejected));
                    }
                } catch (error) {
                    return onRejected(error)
                }
            }
            this.status = FULFILLED;
            this.value = value;
        }
        // reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
        let reject = (v) => {
            if (ignore) {
                return;
            }
            ignore = true;
            this.status = REJECTED;
        }
        // 立即执行回调函数
        try {
            excutor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    finally() {

    }
    then() {

    }
    catch () {

    }
}

Object.defineProperties(MyPromise, {
    "all": {
        value() {},
        "writable": true,
        "enumerable": false,
        "configurable": true
    },
    "race": {
        value() {},
        "writable": true,
        "enumerable": false,
        "configurable": true
    },
    "resolve": {
        value() {},
        "writable": true,
        "enumerable": false,
        "configurable": true
    },
    "reject": {
        value() {},
        "writable": true,
        "enumerable": false,
        "configurable": true
    },
    "allSettled": {
        value() {},
        "writable": true,
        "enumerable": false,
        "configurable": true
    }
});

let test = new MyPromise(function(resolve, reject) {

});

console.log(test, Object.getOwnPropertyDescriptors(MyPromise.prototype));
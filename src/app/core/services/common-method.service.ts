/**
 *  公共的方法文件
 * 
 * 设置cookie setCookie(),获取cookie getCookie(),删除cookie deleteCookie()
 */
import { Injectable } from '@angular/core';

declare function unescape(s: string): string;
declare function escape(s: string): string;

@Injectable()
export class CommonMethodService {

    /**
     * 设置cookie函数
     * 
     * @param {any} name cookie 名称
     * @param {string} value cookie的值
     * @param {string} time cookie的过期时间,单位是毫秒
     */
    setCookie(name, value: string, time?: any) {
        var strsec = this.getsec(time);
        var exp = new Date();
        var expires = time ? time : null;
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : (";expires=" + exp.toUTCString()));
    }
    /**
     * 将当前时间转换为毫秒
     * 
     * @param {any} str 时间，传入的格式：s20是代表20秒
                                      //h是指小时，如12小时则是：h12
                                      //d是天数，30天则：d30
     * @returns 返回转换好的毫秒时间
     * @memberof CommonMethodService
     */
    public getsec(str) {
        var str1 = str.substring(1, str.length) * 1;
        var str2 = str.substring(0, 1);
        if (str2 == "s") {
            return str1 * 1000;
        }
        else if (str2 == "h") {
            return str1 * 60 * 60 * 1000;
        }
        else if (str2 == "d") {
            return str1 * 24 * 60 * 60 * 1000;
        }
    }
    /**
     * 读取cookie函数
     * 
     * @param {any} Name cookie的名称
     * @returns 
     */
    getCookie(Name) {
        let search = Name + "=";
        let offset;
        let end;
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length
                end = document.cookie.indexOf(";", offset)
                if (end == -1) end = document.cookie.length
                return unescape(document.cookie.substring(offset, end))
            }
            else return ""
        }
    }
    /**
     * 删除 cookie函数
     * 
     * @param {any} name cookie名称
     */
    deleteCookie(name) {
        let expdate = new Date();
        expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
        this.setCookie(name, "", expdate);
    }

}
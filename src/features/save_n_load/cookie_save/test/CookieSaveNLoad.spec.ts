import { beforeEach, describe, expect, test, vi } from "vitest";
import { CookieSaveNLoad } from "../CookieSaveNLoad";
import { Cookies } from "typescript-cookie";
import { CookieAttributes } from "typescript-cookie/dist/types";
import { SaveWithName } from "../../SaveAndLoadRepo";


describe("CookieSaveNLoad", ()=>{
    let cookieSaveNLoad : CookieSaveNLoad
    let v
    let mock_v_obj
    
    beforeEach(()=>{
        let c = Cookies
        v = {}
        vi.spyOn(c, "set").mockImplementation(
            (name: string, value: string | number | boolean, attributes?: CookieAttributes)=>{
            v[name] = value
            return ''
        })
        vi.spyOn(c, "get").mockImplementation((name?: string)=>{
            if(v[name]){
                try {
                    return JSON.parse(v[name])
                } catch(e) {
                    return v[name]
                }
            }
            return null
        })
        cookieSaveNLoad = new CookieSaveNLoad()
        cookieSaveNLoad['save_all_data'] = {}
        mock_v_obj = {
            current_question_name: "q1",
            timestamp: 100,
            values: {}
        }
    })

    describe("load_all_data", ()=>{
        test("load empty if not save at all", ()=>{
            cookieSaveNLoad.load_all_data()
            let data = cookieSaveNLoad['save_all_data']
            expect(Object.keys(data).length).toBe(0)
        })

        test("load empty if save is just string, not json", ()=>{
            v[cookieSaveNLoad['save_all_name']] = "hello"
            cookieSaveNLoad.load_all_data()
            let data = cookieSaveNLoad['save_all_data']
            expect(Object.keys(data).length).toBe(0)
        })

        test("load data if have saves", ()=>{
            let save_name1 = "save1"
            let save_name2 = "save2"
            let expect_save_names = [save_name1, save_name2]
            let saves = {}
            let values_name = "values"
            saves[save_name1] = {}
            saves[save_name1][values_name] = {}
            saves[save_name2] = {}
            saves[save_name2][values_name] = {}
            v[cookieSaveNLoad['save_all_name']] = JSON.stringify(saves)
            cookieSaveNLoad.load_all_data()
            let data = cookieSaveNLoad['save_all_data']
            let keys = Object.keys(data)
            for(let i=0;i<keys.length;i++){
                let key = keys[i]
                expect(key).toBe(expect_save_names[i])
                expect(data[key][values_name]).toBeInstanceOf(Object)
            }
        })
    })

    describe("save", ()=>{
        test("save if not have this save name correctly", ()=>{
            let save_name = "save1"
            let v_obj = mock_v_obj
            vi.spyOn(cookieSaveNLoad, 'save_all')
            cookieSaveNLoad.save(save_name, v_obj)
            expect(cookieSaveNLoad['save_all_data'][save_name]).toEqual(v_obj)
            expect(cookieSaveNLoad.save_all).toBeCalled()
        })

        test("do save if override save name", ()=>{
            let save_name = "save1"
            let v_obj1 = mock_v_obj
            let v_obj2 = {
                current_question_name: "q2",
                timestamp: 110,
                values: {}
            }
            vi.spyOn(cookieSaveNLoad, 'save_all')
            cookieSaveNLoad.save(save_name, v_obj1)
            cookieSaveNLoad.save(save_name, v_obj2, [ save_name ])
            expect(cookieSaveNLoad['save_all_data'][save_name]).toEqual(v_obj2)
            expect(v_obj1).not.toEqual(v_obj2)
            expect(cookieSaveNLoad.save_all).toBeCalled()
        })

        test("do auto save evene if save length is max", ()=>{
            for(let i=0;i<cookieSaveNLoad['MAX_SAVES'];i++){
                cookieSaveNLoad.save("save"+1, mock_v_obj)
            }
            cookieSaveNLoad.save(cookieSaveNLoad['AUTO_SAVE_NAME'], mock_v_obj)
            expect(cookieSaveNLoad['AUTO_SAVE_NAME'] in cookieSaveNLoad['save_all_data'])
            .toBe(true)
        })

        test("do save if override save name also change name", ()=>{
            let save_name = "save1"
            let save_name_new = "save2"
            let v_obj1 = mock_v_obj
            let v_obj2 = {
                current_question_name: "q2",
                timestamp: 110,
                values: {}
            }
            vi.spyOn(cookieSaveNLoad, 'save_all')
            cookieSaveNLoad.save(save_name, v_obj1)
            cookieSaveNLoad.save(save_name_new, v_obj2, [ save_name ])
            expect(cookieSaveNLoad['save_all_data'][save_name_new]).toEqual(v_obj2)
            expect(v_obj1).not.toEqual(v_obj2)
            expect(cookieSaveNLoad.save_all).toBeCalled()
        })

        test("not save if have this save name correctly", ()=>{
            let save_name = "save1"
            let v_obj = mock_v_obj
            vi.spyOn(cookieSaveNLoad, 'save_all')
            cookieSaveNLoad.save(save_name, v_obj)
            cookieSaveNLoad.save(save_name, v_obj)
            expect(cookieSaveNLoad.save_all).toBeCalledTimes(1)
        })
    })

    describe("load", ()=>{
        test("load empty if not have this save name", ()=>{
            let save_name = "save1"
            let res = cookieSaveNLoad.load(save_name)
            expect(res).toBe(null)
        })

        test("load save if have this save name", ()=>{
            let save_name = "save1"
            cookieSaveNLoad['save_all_data'][save_name] = mock_v_obj
            let res = cookieSaveNLoad.load(save_name)
            expect(res).toBe(mock_v_obj)
        })
    })

    describe("is_have_this_save_name", ()=>{
        test("return false if not have this save name", ()=>{
            let save_name = "save1"
            expect(cookieSaveNLoad.is_have_this_save_name(save_name)).toBeFalsy()
        })
        test("return true if have this save name", ()=>{
            let save_name = "save1"
            cookieSaveNLoad['save_all_data'][save_name] = mock_v_obj
            expect(cookieSaveNLoad.is_have_this_save_name(save_name)).toBeTruthy()
        })
    })

    describe("delete_save", ()=>{
        test("delete save correctly", ()=>{
            let save_name = "save1"
            cookieSaveNLoad['save_all_data'][save_name] = mock_v_obj
            cookieSaveNLoad.delete_save(save_name)
            expect(cookieSaveNLoad['save_all_data'][save_name]).toEqual(undefined)
        })
    })

    describe("do_auto_save", ()=>{
        test("auto save correctly", ()=>{
            vi.spyOn(cookieSaveNLoad, 'save_all')
            cookieSaveNLoad.do_auto_save(mock_v_obj)
            expect(cookieSaveNLoad['save_all_data'][cookieSaveNLoad['AUTO_SAVE_NAME']])
            .toBe(mock_v_obj)
            expect(cookieSaveNLoad.save_all).toBeCalled()
        })
    })

    describe("get_saves", ()=>{
        test("get saves if have saves", ()=>{
            let save_name1 = "save1"
            let save_name2 = "save2"
            let v1 = {
                current_question_name: "",
                timestamp : 10,
                values: {}
            }
            let v2 = {
                current_question_name: "",
                timestamp : 15,
                values: {}
            }
            let expect_arr : SaveWithName[] = [
                {
                    save_name: save_name2,
                    save_data: v2,
                },
                {
                    save_name: save_name1,
                    save_data: v1,
                }
            ]
            cookieSaveNLoad['save_all_data'][save_name1] = v1
            cookieSaveNLoad['save_all_data'][save_name2] = v2
            let test_arr = cookieSaveNLoad.get_saves()
            for(let i=0;i<expect_arr.length;i++){
                expect(test_arr[i].save_name).toBe(expect_arr[i].save_name)
                expect(test_arr[i].save_data.timestamp)
                    .toBe(expect_arr[i].save_data.timestamp)
            }
        })

        test("get null if not have any saves", ()=>{
            let test_arr = cookieSaveNLoad.get_saves()
            expect(test_arr.length).toBe(0)
        })
    })

    describe("get_save_by_name", ()=>{
        test("get save by name correctly", ()=>{
            let save_name1 = "save1"
            cookieSaveNLoad['save_all_data'][save_name1] = mock_v_obj
            expect(cookieSaveNLoad.get_save_by_name(save_name1)).toEqual(mock_v_obj)
        })
    })

    describe("get_unused_save_name", ()=>{
        test("get unused save name correctly", ()=>{
            let save_name1 = cookieSaveNLoad['DEFAULT_SAVE_NAME']+" "+1
            let save_name2 = cookieSaveNLoad['DEFAULT_SAVE_NAME']+" "+2
            let v1 = {
                current_question_name: "",
                timestamp : 10,
                values: {}
            }
            cookieSaveNLoad['save_all_data'][save_name1] = v1
            cookieSaveNLoad['save_all_data'][save_name2] = v1
            let unused_name = cookieSaveNLoad.get_unused_save_name()
            expect(unused_name).toBe(cookieSaveNLoad['DEFAULT_SAVE_NAME']+" "+3)
        })
    })

    describe("on_saves_change", ()=>{
        test("add observer on saves change correctly", ()=>{
            let fn1 = vi.fn()
            let fn2 = vi.fn()
            let expect_fns = [fn1, fn2]
            cookieSaveNLoad.on_saves_change(fn1)
            cookieSaveNLoad.on_saves_change(fn2)
            let observ = cookieSaveNLoad['observer_saves_change']
            for(let i=0;i<observ.length;i++){
                expect(observ[i]).toEqual(expect_fns[i])
            }
        })
    })

    describe("signal_saves_change", ()=>{
        test("signal all observer correctly", ()=>{
            let fn1 = vi.fn()
            let fn2 = vi.fn()
            let expect_fns = [fn2, fn1]
            cookieSaveNLoad.on_saves_change(fn1)
            cookieSaveNLoad.on_saves_change(fn2)
            cookieSaveNLoad.signal_saves_change()
            for(let i=0;i<expect_fns.length;i++){
                expect(expect_fns[i]).toBeCalled()
            }
        })
    })

    describe("is_save_max", ()=>{
        test("return false if save amount is not max out yet",()=>{
            let save_name1 = "save1"
            let v1 = {
                current_question_name: "",
                timestamp : 10,
                values: {}
            }
            cookieSaveNLoad['save_all_data'][save_name1] = v1
            expect(cookieSaveNLoad.is_save_max()).toBe(false)
        })

        test("return true if save amount is max",()=>{
            let v1 = {
                current_question_name: "",
                timestamp : 10,
                values: {}
            }
            for(let i=0;i<cookieSaveNLoad['MAX_SAVES'];i++){
                cookieSaveNLoad['save_all_data']['save'+i] = v1
            }
            expect(cookieSaveNLoad.is_save_max()).toBe(true)
        })
    })
})
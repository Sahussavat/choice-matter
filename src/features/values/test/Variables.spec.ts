import { beforeEach, describe, expect, test } from "vitest";
import { Variables, VarType } from "../Variables";

describe("Variables", ()=>{
    let variables : Variables

    beforeEach(()=>{
        variables = new Variables
    })

    describe("get_all_stat_var", ()=>{
        test("get all stat variables correctly", ()=>{
            let stat1 = "stat1"
            let stat2 = "stat2"
            variables[stat1] = {
                show_name : stat1,
                val: 0,
                type: VarType.STAT
            }
            variables[stat2] = {
                show_name : stat2,
                val: 0,
                type: VarType.STAT
            }
            let test_data = variables.get_all_stat_var()
            expect(test_data[stat1]).toEqual(variables[stat1])
            expect(test_data[stat2]).toEqual(variables[stat2])
        })
    })

    describe("get_all_visible_buff", ()=>{
        test("get all visible buff/debuff if all can visible", ()=>{
            let buff1 = "buff1"
            let buff2 = "buff2"
            variables[buff1] = {
                show_name : buff1,
                val: true,
                type: VarType.BUFF
            }
            variables[buff2] = {
                show_name : buff2,
                val: true,
                type: VarType.BUFF
            }
            let test_data = variables.get_all_visible_buff()
            expect(test_data[0]).toEqual(variables[buff1])
            expect(test_data[1]).toEqual(variables[buff2])
        })

        test("get one visible buff/debuff if only one can visible", ()=>{
            let buff1 = "buff1"
            let buff2 = "buff2"
            variables[buff1] = {
                show_name : buff1,
                val: false,
                type: VarType.BUFF
            }
            variables[buff2] = {
                show_name : buff2,
                val: true,
                type: VarType.BUFF
            }
            let test_data = variables.get_all_visible_buff()
            expect(test_data.length).toBe(1)
            expect(test_data[0]).toEqual(variables[buff2])
        })
    })
})
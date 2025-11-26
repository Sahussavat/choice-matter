import { beforeEach, describe, expect, test, vi } from "vitest";
import { CreateCharacterUtill, WhatToDo } from "../CreateCharacterUtill";

describe("CreateCharacterUtill", ()=>{
    let createCharaterUtill : CreateCharacterUtill

    beforeEach(()=>{
        createCharaterUtill = new CreateCharacterUtill
    })

    describe("add_create_todo_list", ()=>{

        test("add todo to list correctly", ()=>{
            let validate_fn = ()=>{return true}
            let on_check_validate_fn = (is_pass : boolean)=>{}
            let on_all_validate_pass = ()=>{}
            createCharaterUtill.add_create_todo_list({
                validate_fn: validate_fn,
                on_check_validate: on_check_validate_fn,
                on_all_validate_pass: on_all_validate_pass,
            })
            let test_todo = createCharaterUtill['what_todo_arr'][0]
            expect(test_todo.validate_fn).toEqual(validate_fn)
            expect(test_todo.on_check_validate).toEqual(on_check_validate_fn)
            expect(test_todo.on_all_validate_pass).toEqual(on_all_validate_pass)
        })
    })

    describe("validate_all", ()=>{
        test("passing false to remain todo after one condition not pass", ()=>{
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return false},
                on_check_validate : vi.fn(),
                on_all_validate_pass: vi.fn()
            })
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : (is_pass : boolean)=>{ expect(is_pass).toBe(false)},
                on_all_validate_pass: vi.fn()
            })
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : (is_pass : boolean)=>{ expect(is_pass).toBe(false)},
                on_all_validate_pass: vi.fn()
            })
            createCharaterUtill.start_create()
        })

        test("return true when all validate is pass", ()=>{
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : vi.fn(),
                on_all_validate_pass: vi.fn()
            })
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : vi.fn(),
                on_all_validate_pass: vi.fn()
            })
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : vi.fn(),
                on_all_validate_pass: vi.fn()
            })
            expect(createCharaterUtill.validate_all()).toBe(true)
        })

        test("return false when one validate is not pass", ()=>{
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : vi.fn(),
                on_all_validate_pass: vi.fn()
            })
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return false},
                on_check_validate : vi.fn(),
                on_all_validate_pass: vi.fn()
            })
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : vi.fn(),
                on_all_validate_pass: vi.fn()
            })
            expect(createCharaterUtill.validate_all()).toBe(false)
        })


        test("first to do must pass true to on check validate fn", ()=>{
            let fn1 = vi.fn()
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return false},
                on_check_validate : (is_pass : boolean)=>{expect(is_pass).toBe(true)},
                on_all_validate_pass: fn1
            })
            createCharaterUtill.validate_all()
        })
    })

    describe("start_create", ()=>{
        test("do on all validate pass function if all condition pass", ()=>{
            let fn1 = vi.fn()
            let fn2 = vi.fn()
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : vi.fn(),
                on_all_validate_pass: fn1
            })
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : vi.fn(),
                on_all_validate_pass: fn2
            })
            createCharaterUtill.start_create()
            expect(fn1).toBeCalled()
            expect(fn2).toBeCalled()
        })

        test("not do on all validate pass function if one condition not pass", ()=>{
            let fn1 = vi.fn()
            let fn2 = vi.fn()
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return false},
                on_check_validate : vi.fn(),
                on_all_validate_pass: fn1
            })
            createCharaterUtill.add_create_todo_list({
                validate_fn : ()=>{return true},
                on_check_validate : vi.fn(),
                on_all_validate_pass: fn2
            })
            createCharaterUtill.start_create()
            expect(fn1).not.toBeCalled()
            expect(fn2).not.toBeCalled()
        })
    })
})
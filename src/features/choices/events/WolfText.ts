import { Values } from "@/features/values/Values"
import { is_player_dead } from "../questions/FightRoll";

let player_meet_wolf = `[ พบเหตุการณ์สุ่ม ] คุณได้เดินสำรวจโบราณสถาน จนกระทั่งคุณสัมผัสได้ถึงเสียงลมหายใจของสิ่งมีชีวิตบางอย่างซึ่งกำลังจะเดินมาทางคุณ จู่ๆ ขนแขนของคุณก็ตั้งชัน สัญชาตญาณภายในจิตพยายามบอกให้คุณวิ่งหนี`

let elf_meet_wolf_first_time = `“ยาร์นา...เขากำลังมา...” หญิงสาวชาวเอลฟ์พูดด้วยน้ำเสียงที่สั่นเครือ`

let elf_meet_wolf_default = `“ร–เรา–ต้องซ่อน” หญิงสาวชาวเอลฟ์พูดด้วยน้ำเสียงที่สั่นเครือ`

export function get_meet_wolf_text(values : Values){
    let elf = ""
    if(values.get_variables().elf_joined_party.val && values.get_variables().readed_note.val){
        elf = elf_meet_wolf_first_time
    } else if(values.get_variables().elf_joined_party.val && !values.get_variables().readed_note.val){
        elf = elf_meet_wolf_default
    }
    return `${player_meet_wolf}

${elf}

คุณจะทำอย่างไรต่อไป`
}

let fight_wolf_narrative = `เสียงลมหายใจนั้นค่อยๆ ดังขึ้นในทุกครั้งที่มันเดินเข้ามาใกล้ จนกระทั่งคุณก็ได้มองเห็นมัน หมาป่าสีดำตัวโตที่ทั้งร่างเต็มไปด้วยเชื้อราและดวงตากลวงโบ๋ มันแยกเขี้ยวพร้อมน้ำลายฟูปาก เขม็งมองหน้าคุณราวกับเหยื่อที่กำลังจะถูกขย้ำ`

let fight_wolf_player = `คุณตัดสินใจที่จะสู้กับมัน แม้ว่าแขนขาจะกำลังสั่นกลัวอยู่ก็ตาม แต่คุณก็เลือกที่จะเผชิญหน้า`

let fight_wolf_elf = `เอลฟ์สาวที่ทำท่าลังเลอยู่ครู่หนึ่ง แต่สุดท้ายก็ตัดสินใจตั้งท่าพร้อมที่จะสู้`

let fight_wolf_halfling = `หัวหน้ากองโจรเองก็ควักอาวุธของตนขึ้นมาด้วยเช่นกัน`

export function get_fight_wolf_text(values : Values){
    let elf = values.get_variables().elf_joined_party.val ? fight_wolf_elf : "";
    let halfling = values.get_variables().halfling_joined_party.val ? fight_wolf_halfling : "";
    return `${fight_wolf_player} ${elf} ${halfling}
    
    ${fight_wolf_narrative}`
}

let escape_wolf_fail = `ตัดสินใจเข้าไปหลบในที่ซ่อน เสียงลมหายใจนั้นใกล้เข้ามาเรื่อยๆ จนแนบชิด คุณรับรู้ได้ว่ามันยืนอยู่หลังที่ซ่อน กำลังดมกลิ่นหาอะไรบางอย่าง ทันใดนั้น ลำตัวของเจ้านั่นก็ยื่นโผล่เข้ามาให้คุณเห็น มันคือร่างของหมาป่ายักษ์ที่ติดเชื้อราไปทั่วทั้งตัว มันตะปบเข้าใส่คุณอย่างเข้าจัง

คุณกรีดร้องด้วยความเจ็บปวด ก่อนจะกระโจนออกจากที่ซ่อน เจ้าหมาป่ารู้ตัวแล้วว่าเหยื่อของมันอยู่ที่ไหน`

let escape_wolf_dead = `

มันตะปบเข้าใส่คุณอย่างเข้าจัง คุณล้มลงนอนลงกับพื้นก่อนจะสิ้นใจตายเพราะทนพิษบาดแผลไม่ไหว`

let escape_wolf_success = `ตัดสินใจเข้าไปหลบในที่ซ่อน เสียงลมหายใจนั้นใกล้เข้ามาเรื่อยๆ จนแนบชิด คุณรับรู้ได้ว่ามันยืนอยู่หลังที่ซ่อน กำลังดมกลิ่นหาอะไรบางอย่าง ทันใดนั้น ลำตัวของเจ้านั่นก็ยื่นโผล่เข้ามาให้คุณเห็น มันคือร่างของหมาป่ายักษ์ที่ติดเชื้อราไปทั่วทั้งตัว มันตะปบลงใส่พื้นใกล้ๆ พวกคุณทั้งสองอย่างหวุดหวิด พวกคุณพยายามจะกลั้นเสียงเอาไว้ในขณะที่มันกำลังชักอุ้งมือกลับ เจ้าหมาป่าทำเสียงคำรามอย่างผิดหวังเมื่อไม่พบเหยื่อ ก่อนที่จะผละตัวออกแล้วเดินจากไป`

export function get_escape_wolf_fail_text(values : Values){
    let pronounce = values.get_variables().elf_joined_party.val 
    || values.get_variables().halfling_joined_party.val ? "คุณกับเพื่อนร่วมทาง" : "คุณ"
    return pronounce + escape_wolf_fail + (is_player_dead(values) ? escape_wolf_dead : "")
}

export function get_escape_wolf_success_text(values : Values){
    let pronounce = values.get_variables().elf_joined_party.val 
    || values.get_variables().halfling_joined_party.val ? "คุณกับเพื่อนร่วมทาง" : "คุณ"
    return pronounce + escape_wolf_success
}
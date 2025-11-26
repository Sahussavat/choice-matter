let player_alome = `คุณ`
let player_w_elf = `คุณกับหญิงสาวชาวเอลฟ์`
let player_w_halfling = `คุณกับหัวหน้ากองโจร`
let player_w_teams = `คุณกับพรรคพวก`

let halfling_open_chest = `หัวหน้าโจรเริ่มทำการสะเดาะกลอนกล่องนั้นด้วยกุญแจที่มีออร่าพลังเวทย์แพร่ออกมา เพียงชั่วครู่ กล่องก็เปิดออก และเผยให้เห็นสมบัติที่อยู่ภายในนั้น



“ถ้าด้วยกุญแจของข้า เจ้า Mimic นี่ก็สามารถแปรสภาพไปเป็นกล่องธรรมดาได้”`

let elf_check_chest = `ได้เดินทางสำรวจภายในโบราณสถาน จนกระทั่งพวกคุณได้พบเข้ากับกล่องสมบัติปริศนาซึ่งตั้งวางให้เห็นอย่างโดดเด่นที่ข้างทางเดิน

หญิงสาวชาวเอลฟ์จ้องมองกล่องนั้นอย่างสงสัย ก่อนที่จะเริ่มร่ายคาถาบางอย่างทันใดนั้นก็ปรากฏรูปวงเวทย์ห้อมล้อมตัวมันอยู่ชั่วครู่ก่อนที่จะคลายออก

“อย่างชัดเจน” หญิงชาวเอลฟ์ก็หันมาบอกกับคุณ “มันคือ Mimic”`

let halfling_check_check = `หัวหน้ากองโจรจ้องมองกล่องนั้นอย่างสงสัย ก่อนที่จะเริ่มตรวจสอบกล่องนั้นอย่างละเอียด

“ไม่ต้องสงสัยเลย” ชายหนุ่มชาวฮาร์ฟลิ่งบอก “มันคือ Mimic”`

let get_a_potions = `ได้รับ Health Potion x5`

export let found_again_not_know = `${player_alome}ได้เดินมาจนถึงสถานที่ที่มีกล่องน่าสงสัยวางตั้งไว้อยู่



คุณจะทำอย่างไร`

export let found_again_not_know_w_halfling = `${player_alome}ได้เดินมาจนถึงสถานที่ที่มีกล่องน่าสงสัยวางตั้งไว้อยู่

${halfling_check_check}

${halfling_open_chest}


${get_a_potions}`

export let found_again_know_w_halfling = `${player_alome}ได้เดินมาจนถึงสถานที่ที่มีกล่อง Mimic วางตั้งไว้อยู่

${halfling_check_check}

${halfling_open_chest}


${get_a_potions}`

export let found_again_know = `คุณได้เดินมาจนถึงสถานที่ที่มีกล่อง Mimic วางตั้งไว้อยู่



คุณจะทำอย่างไร`

export let found_first_time_with_elf = `${player_w_elf}${elf_check_chest}`

export let found_first_time_with_halfling = `${player_w_halfling}ได้เดินทางสำรวจภายในโบราณสถาน จนกระทั่งพวกคุณได้พบเข้ากับกล่องสมบัติปริศนาซึ่งตั้งวางให้เห็นอย่างโดดเด่นที่ข้างทางเดิน

${halfling_check_check}



${halfling_open_chest}


${get_a_potions}`

export let found_first_time_with_all = `${player_w_teams}${elf_check_chest}

“ให้ข้าจัดการเอง” หัวหน้ากองโจรบอก

${halfling_open_chest}


${get_a_potions}`

export let found_alone_first_time = `คุณได้เดินสำรวจภายในโบราณสถานต่อ จนกระทั่งได้ไปพบเข้ากับกล่องสมบัติปริศนากล่องหนึ่งซึ่งตั้งวางอยู่ให้เห็นอย่างโดดเด่นอยู่ที่ข้างทางเดิน



คุณจะทำอย่างไร`
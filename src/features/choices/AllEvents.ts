import { Apple } from "./events/Apple.event";
import { FightWolfEvent, MeetWolfEvent } from "./events/Wolf.event";
import { EscapeWolfFail, EscapeWolfSuccess } from "./events/WolfEscape.event";
import { WolfFightFail, WolfFightSuccess } from "./events/WolfFight.event";

export class AllEvents {
    apple_event = new Apple

    meet_wolf = new MeetWolfEvent
    fight_wolf = new FightWolfEvent

    escape_wolf_fail = new EscapeWolfFail
    escape_wolf_success = new EscapeWolfSuccess

    wolf_fight_win = new WolfFightSuccess
    wolf_fight_lose = new WolfFightFail
}
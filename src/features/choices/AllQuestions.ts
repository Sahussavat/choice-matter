import { Apple } from "./questions/Apple.question";
import { RitualDetroyAllEnd, RitualLosingElfEnd, RitualPurePotionEnd } from "./questions/Conclusion.question";
import { ElfConcludeDestroyButSurvive, ElfConcludeHelpAll, ElfConcludeLoseAll, ElfConcludeLoseOne } from "./questions/ConclusionElf.question";
import { ThiefConcludeAllDied, ThiefConcludeHelp, ThiefConcludeNotHelp } from "./questions/ConclusionHalfling.question";
import { PlayerConcludeFail, PlayerConcludeSuccess } from "./questions/ConclusionPlayer.question";
import { ElfMeetDefault, ElfMeetFirstTime } from "./questions/Elf.question";
import { ElfTalk1, ElfTalk2, ElfTalk3, ElfTalk4, ElfTalk5 } from "./questions/ElfTalk.question";
import { EnterAncietDefault, FirstTimeEnterAncient } from "./questions/EnterAncient.question";
import { GoblinCampFirstTime } from "./questions/GoblinCamp.question";
import { GoblinCampFightLose, GoblinCampFightWin } from "./questions/GoblinCampFight.question";
import { GoblinCampTrapFail, GoblinCampTrapSuccess, TrapKilledGoblin } from "./questions/GoblinCampTrap.question";
import { LibraryDefault, LibraryFirstTime, LibraryPickedUp } from "./questions/Library.question";
import { MimicAllNotKnow, MimicAloneDefaultKnow, MimicAloneDefaultNotKnow, MimicAloneFirstTime, MimicElfFirstTime, MimicHalflingKnow, MimicHalflingNotKnow } from "./questions/Mimic.question";
import { MimicFightFail, MimicFightSucc, StealthKillMimic } from "./questions/MimicFight.question";
import { MimicIdentifyFail, MimicIdentifySucc, MimicOpenChest } from "./questions/MimicTrap.question";
import { MysteryRoomDefault, MysteryRoomFirst } from "./questions/MysteryRoom.question";
import { InsideRoomAloneDefaultNotRead, InsideRoomAloneDefaultRead, InsideRoomAloneFirstTime, InsideRoomWithElfAgain, InsideRoomWithElfFirstTime } from "./questions/MysteryRoomUnlock.question";
import { InsideRoomTalk1, InsideRoomTalk2 } from "./questions/MysteryRoomUnlockTalk.question";
import { PurePotionTalk1, PurePotionTalk2, PurePotionTalk3 } from "./questions/PurePotion.question";
import { RitualRoom } from "./questions/Ritual.question";
import { RitualFightLose, RitualFightLoseElf, RitualFightPurePotion } from "./questions/RitualFight.question";
import { ThiefCampDefaultKilled, ThiefCampDefaultNotKilled, ThiefCampFirstTime } from "./questions/ThiefCamp.question";
import { ThiefCampFightLose, ThiefCampFightWin } from "./questions/ThiefCampFight.question";
import { ThiefAcceptQuest, ThiefPersuaSuccess1, ThiefPersuaSuccess2, ThiefPersuaSuccess3 } from "./questions/ThiefCampPersua";
import { ThiefQuestComplete1, ThiefQuestComplete2 } from "./questions/ThiefCampQuest.question";
import { VillageDefault, VillageFirstTime } from "./questions/Village.question";
import { WizardShopDefault, WizardShopDoneShopping, WizardShopFirstTime } from "./questions/WizardShop.question";

export class AllQuestions {
    apple_question = new Apple()
    wizard_shop_first_time = new WizardShopFirstTime()
    wizard_shop_default = new WizardShopDefault()
    wizard_shop_done_shopping = new WizardShopDoneShopping()
    village_first_time = new VillageFirstTime()
    village_default = new VillageDefault()
    enter_ancient_first_time = new FirstTimeEnterAncient()
    enter_ancient_default = new EnterAncietDefault()
    thief_camp_first_time = new ThiefCampFirstTime()
    thief_camp_default_not_killed = new ThiefCampDefaultNotKilled()
    theif_camp_default_killed = new ThiefCampDefaultKilled()

    thief_persuation_succ1 = new ThiefPersuaSuccess1()
    thief_persuation_succ2 = new ThiefPersuaSuccess2()
    thief_persuation_succ3 = new ThiefPersuaSuccess3()
    thief_persuation_accept_quest = new ThiefAcceptQuest()
    thief_quest_complete1 = new ThiefQuestComplete1()
    thief_quest_complete2 = new ThiefQuestComplete2()

    thief_fight_win = new ThiefCampFightWin
    thief_fight_lose = new ThiefCampFightLose

    goblin_camp_first_time = new GoblinCampFirstTime()
    goblin_fight_win = new GoblinCampFightWin
    goblin_fight_lose = new GoblinCampFightLose
    goblin_trap_fail = new GoblinCampTrapFail
    goblin_trap_success = new GoblinCampTrapSuccess
    trap_killed_goblin = new TrapKilledGoblin

    elf_meet_first_time = new ElfMeetFirstTime
    elf_meet_default = new ElfMeetDefault

    elf_talk1 = new ElfTalk1
    elf_talk2 = new ElfTalk2
    elf_talk3 = new ElfTalk3
    elf_talk4 = new ElfTalk4
    elf_talk5 = new ElfTalk5

    mimic_alone_first_time = new MimicAloneFirstTime
    mimic_alone_default_not_know = new MimicAloneDefaultNotKnow
    mimic_alone_default_know = new MimicAloneDefaultKnow
    mimic_elf_first_time = new MimicElfFirstTime
    mimic_halfling_not_know = new MimicHalflingNotKnow
    mimic_halfling_know = new MimicHalflingKnow
    mimic_all_not_know = new MimicAllNotKnow
    
    mimic_identify_succ = new MimicIdentifySucc
    mimic_identify_fail = new MimicIdentifyFail
    mimic_open_chest = new MimicOpenChest

    stealth_kill_mimic = new StealthKillMimic
    mimic_fight_success = new MimicFightSucc
    mimic_fight_fail = new MimicFightFail

    library_first_time = new LibraryFirstTime
    library_default = new LibraryDefault
    library_picked_up = new LibraryPickedUp

    mystery_room_first_time = new MysteryRoomFirst()
    mystery_room_default = new MysteryRoomDefault()

    inside_room_alone_first_time = new InsideRoomAloneFirstTime
    inside_room_default_not_read = new InsideRoomAloneDefaultNotRead
    inside_room_default_read = new InsideRoomAloneDefaultRead
    inside_room_with_elf_first_time = new InsideRoomWithElfFirstTime
    inside_room_with_elf_again = new InsideRoomWithElfAgain

    inside_room_talk1 = new InsideRoomTalk1
    inside_room_talk2 = new InsideRoomTalk2

    pure_potion_talk1 = new PurePotionTalk1
    pure_potion_talk2 = new PurePotionTalk2
    pure_potion_talk3 = new PurePotionTalk3

    ritual_room = new RitualRoom

    ritual_fight_lose_elf = new RitualFightLoseElf
    ritual_fight_pure_potion = new RitualFightPurePotion
    ritual_fight_lose = new RitualFightLose

    conclusion_ritual_destroy_end = new RitualDetroyAllEnd
    conclusion_ritual_lose_elf_end = new RitualLosingElfEnd
    conclusion_ritual_pure_potion_end = new RitualPurePotionEnd

    elf_conclude_lose_all = new ElfConcludeLoseAll
    elf_destroy_but_survive = new ElfConcludeDestroyButSurvive
    elf_conclude_lose_one = new ElfConcludeLoseOne
    elf_conclude_help_all = new ElfConcludeHelpAll

    thief_conclude_all_died = new ThiefConcludeAllDied
    thief_conclude_not_help = new ThiefConcludeNotHelp
    thief_conclude_help = new ThiefConcludeHelp

    player_conclude_fail = new PlayerConcludeFail
    player_conclude_success = new PlayerConcludeSuccess

}
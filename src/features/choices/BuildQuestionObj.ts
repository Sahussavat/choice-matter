import { Values } from "../values/Values";
import { Question } from "./Question";

export abstract class BuildQuestionObj {
    abstract build(values : Values) : Question 
}
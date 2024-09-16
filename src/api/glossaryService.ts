import axios from "axios";
import {GlossaryType} from "../utils/types/GlossaryType.ts";
import {backendUrl} from "../env.ts";

export const getGlossary = async () => {
    const res = axios.get<GlossaryType[]>(backendUrl+"glossary/get_all_glossaries.php");
    return await res;
};
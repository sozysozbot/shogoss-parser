import { Side, Move, Profession, PiecePhaseMove } from "shogoss-core";
import { Coordinate, ShogiColumnName, ShogiRowName } from "shogoss-core/dist/coordinate";

export function parse_coord(s: string): Coordinate {
    const column: ShogiColumnName = ((c) => {
        if (c === "１" || c === "1") {
            return "１";
        } else if (c === "２" || c === "2") {
            return "２";
        } else if (c === "３" || c === "3") {
            return "３";
        } else if (c === "４" || c === "4") {
            return "４";
        } else if (c === "５" || c === "5") {
            return "５";
        } else if (c === "６" || c === "6") {
            return "６";
        } else if (c === "７" || c === "7") {
            return "７";
        } else if (c === "８" || c === "8") {
            return "８";
        } else if (c === "９" || c === "9") {
            return "９";
        } else {
            throw new Error(`棋譜の筋（列）が「${c}」であり「１〜９」「1〜9」のどれでもありません`);
        }
    })(s[0]);

    const row: ShogiRowName = ((c) => {
        if (c === "１" || c === "1" || c === "一") {
            return "一";
        } else if (c === "２" || c === "2" || c === "二") {
            return "二";
        } else if (c === "３" || c === "3" || c === "三") {
            return "三";
        } else if (c === "４" || c === "4" || c === "四") {
            return "四";
        } else if (c === "５" || c === "5" || c === "五") {
            return "五";
        } else if (c === "６" || c === "6" || c === "六") {
            return "六";
        } else if (c === "７" || c === "7" || c === "七") {
            return "七";
        } else if (c === "８" || c === "8" || c === "八") {
            return "八";
        } else if (c === "９" || c === "9" || c === "九") {
            return "九";
        } else {
            throw new Error(`棋譜の段（行）が「${c}」であり「１〜９」「1〜9」「一〜九」のどれでもありません`);
        }
    })(s[1]);

    return [column, row];
}

export function parse_profession(s: string): Profession {
    if (s === "香") return "香";
    else if (s === "桂") return "桂";
    else if (s === "銀") return "銀";
    else if (s === "金") return "金";
    else if (s === "成香" || s === "杏") return "成香";
    else if (s === "成桂" || s === "圭") return "成桂";
    else if (s === "成銀" || s === "全") return "成銀";
    else if (s === "ク") return "ク";
    else if (s === "ル") return "ル";
    else if (s === "ナ") return "ナ";
    else if (s === "ビ") return "ビ";
    else if (s === "ポ" || s === "歩" || s === "兵") return "ポ";
    else if (s === "と") return "と";
    else if (s === "キ" || s === "王") return "キ";
    else if (s === "超") return "超";
    else {
        throw new Error(`駒の種類が「${s}」であり「香」「桂」「銀」「金」「成香」「成桂」「成銀」「杏」「圭」「全」「ク」「ル」「ナ」「ビ」「ポ」「歩」「兵」「と」「キ」「王」「超」のどれでもありません`);
    }
}

export function parse_one(s: string): Move {
    // 0:   ▲
    // 1-2: ７五
    // 3: ポ
    // (3-4 if promoted)
    let index = 0;
    const side: Side =
        s[0] === "黒" || s[0] === "▲" || s[0] === "☗" ? "黒" :
            s[0] === "白" || s[0] === "△" || s[0] === "☖" ? "白" : (() => { throw new Error("棋譜が「黒」「▲」「☗」「白」「△」「☖」のどれかで始まっていません") })();
    index++;

    const to: Coordinate = parse_coord(s.slice(index, index + 2));
    index += 2;

    const profession_length = s[3] === "成" ? 2 : 1;
    const prof = parse_profession(s.slice(index, index + profession_length));
    index += profession_length;

    // All that follows are optional.
    // 以降はオプショナル。「1. 移動元明記」「2. 成・不成」「3. 碁石の座標」がこの順番で現れなければならない。

    // 1. 移動元明記
    // 「右」「左」「打」、または「（4五）」など
    const from: "右" | "左" | "打" | Coordinate | null = (() => {
        if (s[index] === "右") {
            index++; return "右";
        } else if (s[index] === "左") {
            index++; return "左";
        } else if (s[index] === "打") {
            index++; return "打"
        } else if (s[index] === "(" || s[index] === "（") {
            index++;
            const coord = parse_coord(s.slice(index, index + 2));
            index += 2;
            if (s[index] === ")" || s[index] === "）") {
                index++;
                return coord;
            } else {
                throw new Error(`開きカッコと座標の後に閉じカッコがありません`)
            }
        } else {
            return null;
        }
    })();

    const promotes: boolean | null = (() => {
        if (s[index] === "成") {
            index++; return true;
        } else if (s.slice(index, index + 2) === "不成") {
            index += 2; return false;
        } else return null;
    })();

    const stone_to: Coordinate | null = (() => {
        const c = s[index]; if (!c) return null;
        if (("1" <= c && c <= "9") || ("１" <= c && c <= "９")) {
            const coord = parse_coord(s.slice(index, index + 2));
            index += 2;
            if (!s[index]) {
                return coord;
            } else {
                throw new Error(`手「${s}」の末尾に解釈不能な「${s.slice(index)}」があります`)
            }
        } else {
            throw new Error(`手「${s}」の末尾に解釈不能な「${s.slice(index)}」があります`)
        }
    })();


    const piece_phase: PiecePhaseMove =
        promotes !== null ? (from ? { side, to, prof, promotes, from } : { side, to, prof, promotes })
            : (from ? { side, to, prof, from } : { side, to, prof });
    return stone_to ? { piece_phase, stone_to } : { piece_phase };
}

export function parse(s: string): Move[] {
    s = s.replace(/([黒▲☗白△☖])/g, " $1");
    const moves = s.split(/\s/);
    return moves.map(s => s.trim()).filter(s => s !== "").map(parse_one);
}
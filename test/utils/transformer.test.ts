import { EpisodeType } from "~/store/enums"
import { ToChineseTypeReturn, ToTimeOpt } from "~/utils/enums"
import { formatNum, formatSize, toChineseDay, toChineseType, toTime } from "~/utils/transformer"

describe("formatSize", (): void => {
  it("should format bytes correctly", (): void => {
    expect(formatSize(500)).toBe("500 B")
    expect(formatSize(1023)).toBe("1023 B")
  })

  it("should format kilobytes correctly", (): void => {
    expect(formatSize(1024)).toBe("1.00 KB")
    expect(formatSize(1500)).toBe("1.46 KB")
    expect(formatSize(1048575)).toBe("1024.00 KB")
  })

  it("should format megabytes correctly", (): void => {
    expect(formatSize(1048576)).toBe("1.00 MB")
    expect(formatSize(2097152)).toBe("2.00 MB")
    expect(formatSize(3145728)).toBe("3.00 MB")
  })

  it("should handle edge cases", (): void => {
    expect(formatSize(0)).toBe("0 B")
  })
})

describe("formatNum", (): void => {
  it("should handle undefined input", (): void => {
    expect(formatNum(undefined)).toBeUndefined()
  })

  it("should handle NaN input", (): void => {
    expect(formatNum(NaN)).toBeUndefined()
  })

  it("should format numbers in the thousands correctly", (): void => {
    expect(formatNum(9999)).toBe("9999")
    expect(formatNum(10000)).toBe("1万")
    expect(formatNum(15000)).toBe("1.5万")
    expect(formatNum(100000)).toBe("10万")
  })

  it("should format numbers in the millions correctly", (): void => {
    expect(formatNum(100000000)).toBe("1亿")
    expect(formatNum(150000000)).toBe("1.5亿")
    expect(formatNum(1000000000)).toBe("10亿")
  })

  it("should handle numbers less than 10000 correctly", (): void => {
    expect(formatNum(999)).toBe("999")
    expect(formatNum(0)).toBe("0")
  })
})

describe("toChineseDay", (): void => {
  it("should return Correct Chinese week", (): void => {
    expect(toChineseDay(1)).toBe("一")
    expect(toChineseDay(2)).toBe("二")
    expect(toChineseDay(3)).toBe("三")
    expect(toChineseDay(4)).toBe("四")
    expect(toChineseDay(5)).toBe("五")
    expect(toChineseDay(6)).toBe("六")
    expect(toChineseDay(7)).toBe("日")
  })

  it("should throw an error for invalid day values", (): void => {
    expect(toChineseDay(0)).toBeUndefined()
    expect(toChineseDay(8)).toBeUndefined()
    expect(toChineseDay(-1)).toBeUndefined()
    expect(toChineseDay(10)).toBeUndefined()
  })
})

describe("toChineseType", (): void => {
  it("should return correct Chinese type for valid EpisodeType inputs", (): void => {
    expect(toChineseType(EpisodeType.ALL)).toBe(ToChineseTypeReturn.ALL)
    expect(toChineseType(EpisodeType.ANIME)).toBe(ToChineseTypeReturn.ANIME)
    expect(toChineseType(EpisodeType.GUOCHUANG)).toBe(ToChineseTypeReturn.GUOCHUANG)
  })

  it("should return ToChineseTypeReturn.DEFAULT for invalid EpisodeType inputs", (): void => {
    const invalidType = "invalid" as EpisodeType
    expect(toChineseType(invalidType)).toBe(ToChineseTypeReturn.DEFAULT)
  })
})

describe("toTime", (): void => {
  it("should convert milliseconds correctly", (): void => {
    expect(toTime(60000, ToTimeOpt.MS)).toBe(60000)
  })

  it("should convert milliseconds to seconds correctly", (): void => {
    expect(toTime(60000, ToTimeOpt.S)).toBe(60)
  })

  it("should convert milliseconds to minutes correctly", (): void => {
    expect(toTime(60000, ToTimeOpt.M)).toBe(1)
  })

  it("should convert milliseconds to hours correctly", (): void => {
    expect(toTime(3600000, ToTimeOpt.H)).toBe(1)
  })

  it("should convert milliseconds to minutes by default", (): void => {
    expect(toTime(60000)).toBe(1)
  })

  it("should handle zero milliseconds", (): void => {
    expect(toTime(0, ToTimeOpt.MS)).toBe(0)
    expect(toTime(0, ToTimeOpt.S)).toBe(0)
    expect(toTime(0, ToTimeOpt.M)).toBe(0)
    expect(toTime(0, ToTimeOpt.H)).toBe(0)
  })

  it("should handle negative time values", (): void => {
    expect(toTime(-60000, ToTimeOpt.MS)).toBe(-60000)
    expect(toTime(-60000, ToTimeOpt.S)).toBe(-60)
    expect(toTime(-60000, ToTimeOpt.M)).toBe(-1)
    expect(toTime(-3600000, ToTimeOpt.H)).toBe(-1)
  })
})

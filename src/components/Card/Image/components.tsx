import type { CSSProp, StyledComponent } from "styled-components"
import styled from "styled-components"

import type { ImgProps } from "./types"

/**
 * @description 图片
 * @param {ImgProps} props 图片Props
 * @return {*}  {CSSProp}
 */
const Img: StyledComponent<"img", ImgProps, ImgProps, never> = styled.img<ImgProps>(
  (props: ImgProps): CSSProp => ({
    width: !props.loaded && 0,
    height: !props.loaded && 0,
    opacity: !props.loaded && 0,
    filter: !props.loaded && "blur(10px)",
  }),
)

export { Img }

import styled from "styled-components"
import type { CSSProp, StyledComponent } from "styled-components"

import type { EpisodeIndexProps } from "./types"

/**
 * @description 最新一集的名称
 * @param {EpisodeIndexProps} props 最新一集的名称Props
 * @return {*}  {CSSProp}
 */
const EpisodeIndex: StyledComponent<"div", EpisodeIndexProps, EpisodeIndexProps, never> = styled.div<EpisodeIndexProps>(
  (props: EpisodeIndexProps): CSSProp => ({
    color: props.published ? `var(--episode-published-text-color)` : `var(--episode-text-color)`,
  }),
)

export { EpisodeIndex }

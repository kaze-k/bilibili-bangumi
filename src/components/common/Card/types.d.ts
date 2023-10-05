interface CardProps extends DarkModeProps {
  headerLeft?: React.ReactElement | React.ReactElement[]
  headerRight?: React.ReactElement | React.ReactElement[]
  children: React.ReactElement | React.ReactElement[]
  footer?: React.ReactElement | React.ReactElement[]
}

import { StyledButton } from 'src/components/Button/Button.styled';

export interface ButtonProps {
  /**
   * Primart colooasdfasdf
   */
  primary?: boolean;
  borderRadius?: number;
}

export const Button = ({ primary = false, borderRadius = 10 }: ButtonProps) => {
  const onClick = () => {};
  return (
    <StyledButton onClick={onClick} $borderRadius={borderRadius} $primary={primary}>
      asdasdasd
    </StyledButton>
  );
};

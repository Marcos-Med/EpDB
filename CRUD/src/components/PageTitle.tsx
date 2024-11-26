import { Typography } from '@mui/material';

interface IPageTitleProps {
  title: string
}

const PageTitle = ({ title }: IPageTitleProps) => { //Define o componente do título da página
  return (
    <Typography variant="h5">
      {title}
    </Typography>
  );
};
export default PageTitle;
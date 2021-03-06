import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    chip: {
      margin: '5px 5px 5px 0',
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '10px',
    },
    spacing: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
});

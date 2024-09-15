export const styles: Record<string, React.CSSProperties> = {
  mainWindow: {
    padding: 32,
  },
  title: {
    marginTop: 32,
    marginBottom: 45,
    fontFamily: 'Roboto, sans-serif',
    fontSize: 32,
  },
  container: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 8,
    padding: 24,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containerHeader: {
    display: 'flex',
    justifyContent: 'center',
  },
  startBtn: {
    marginLeft: 8,
  },
  outputContainer: {
    backgroundColor: 'rgb(240, 240, 240)',
    borderRadius: 8,
    padding: 16,
    margin: '20px auto',
    whiteSpace: 'pre-line',
  },
};

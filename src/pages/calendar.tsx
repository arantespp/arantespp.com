import { Box, Embed, Themed } from 'theme-ui';

const Calendar = () => {
  return (
    <>
      <Themed.h1>Calendar</Themed.h1>
      <Box sx={{ overflowX: 'auto' }}>
        <Embed
          src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FSao_Paulo&amp;src=YXJhbnRlc3BwQGdtYWlsLmNvbQ&amp;src=ZW4uYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%237986CB&amp;color=%237986CB&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=0&amp;mode=WEEK&amp;title&amp;showTitle=0&amp;showNav=1&amp;showDate=1"
          title="Calendar"
          sx={{ borderWidth: 0, width: '100%', height: '600px', minWidth: 800 }}
          frameBorder="0"
          scrolling="no"
        />
      </Box>
    </>
  );
};

export default Calendar;

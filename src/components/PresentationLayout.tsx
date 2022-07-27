import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Flex } from 'theme-ui';
import Footer from './Footer';
import Header from './Header';
import 'katex/dist/katex.min.css';

export const PresentationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, transition: { duration: 2 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Header />
          <Flex
            sx={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {children}
          </Flex>
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

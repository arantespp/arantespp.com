import { paramCase } from 'change-case';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Link, Themed } from 'theme-ui';
import url from 'url';

const componentsByLevel = [
  Themed.h1,
  Themed.h2,
  Themed.h3,
  Themed.h4,
  Themed.h5,
  Themed.h6,
];

const HeadingLink = ({
  children,
  level,
  noH1,
  id,
  href,
}: {
  children: React.ReactNode[];
  level: number;
  noH1: boolean;
  id?: string;
  href: string;
}) => {
  const ResolvedComponent = componentsByLevel[level - 1];

  /**
   * Title will be shown at PostHeader component.
   */
  const hiddenH1 = level === 1 && noH1;

  return (
    <ResolvedComponent id={id} hidden={hiddenH1}>
      {level === 1 ? (
        children
      ) : (
        <NextLink href={href}>
          <Link
            sx={{
              cursor: 'pointer',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {children}
          </Link>
        </NextLink>
      )}
    </ResolvedComponent>
  );
};

const HeadingChildrenArray = ({
  children = [],
  level,
  noH1,
}: {
  children: React.ReactNode[];
  level: number;
  noH1: boolean;
}) => {
  const { asPath } = useRouter();

  /**
   * Solves the problem when there is only "#" without text on .md files.
   */
  if (children.length === 0) {
    return null;
  }

  /**
   * It can be an object because some heading may be pointing to a
   * specific URL.
   *
   * ```
   * ### [All][/all]
   * ```
   */
  if (typeof children[0] === 'object') {
    const props = (children?.[0] as any)?.props;

    if (props.children) {
      return (
        <HeadingLink href={props.href || '/'} level={level} noH1={noH1}>
          {props.children}
        </HeadingLink>
      );
    }

    return null;
  }

  const { pathname } = url.parse(asPath);
  const hash = paramCase(children[0] as any);
  const href = `${pathname}#${hash}`;

  return (
    <HeadingLink id={hash} href={href} level={level} noH1={noH1}>
      {children}
    </HeadingLink>
  );
};

const Heading = ({
  children,
  noH1 = false,
  level,
}: {
  children: React.ReactNode | React.ReactNode[];
  level: number;
  noH1?: boolean;
}) => {
  return (
    <HeadingChildrenArray {...{ level, noH1 }}>
      {Array.isArray(children) ? children : [children]}
    </HeadingChildrenArray>
  );
};

export default Heading;

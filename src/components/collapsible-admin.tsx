import React, { useState, useContext, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { cn } from '@/lib/utils';
import useMeasure from 'react-use-measure';
import { SidebarContext } from './sidebar/sidebar-context-provider';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  headerClassName?: string;
  autoOpen: boolean;
  onlyShowOnMobile?: boolean;
  hideChevron?: boolean;
}

const CollapsibleAdmin = ({
  title,
  children,
  autoOpen,
  headerClassName,
  onlyShowOnMobile = false,
  className,
  header,
  hideChevron = false
}: Props) => {
  const { state } = useContext(SidebarContext);
  const [isExpand, setIsExpand] = useState<boolean>(autoOpen);

  const [measureRef, { height: measuredHeight }] = useMeasure();

  const collpaseProps = useSpring({
    height: isExpand ? measuredHeight : 0,
    config: { tension: 250, friction: 30 }
  });

  useEffect(() => {
    if (!state.isOpen) {
      setIsExpand(false);
    }
  }, [state.isOpen]);

  return (
    <div
      className={cn(
        {
          'bg-[#F8FBFF] rounded-xl pb-2': isExpand
        },
        className
      )}
    >
      <div
        onClick={() => setIsExpand(!isExpand)}
        className={cn(
          'flex justify-between p-3 items-center cursor-pointer',
          headerClassName
        )}
      >
        {header ? header : <h4>{title}</h4>}
        {!hideChevron && (
          <Button
            variant="ghost"
            className={cn('p-0 h-fit focus:text-black', {
              'md:hidden': onlyShowOnMobile
            })}
          >
            <ChevronDown
              className={cn('rotate-0 transition-transform duration-200', {
                'rotate-180': isExpand
              })}
            />
          </Button>
        )}
      </div>
      <animated.div
        className={cn('', {
          'overflow-hidden': !isExpand
        })}
        style={{ ...collpaseProps, overflow: 'hidden' }}
      >
        <div ref={measureRef}>{children}</div>
      </animated.div>
    </div>
  );
};

export default CollapsibleAdmin;

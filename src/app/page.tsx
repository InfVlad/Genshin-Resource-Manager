'use client';
import { useState } from 'react';
import { MiniCard, Text, HeaderButton, FilterButton } from '@/components';
import { useModal } from '@/hooks/useModal';
import type { ElementType } from '../types/characterTypes';

const Something = ({ _onClose }: { _onClose: () => void }) => {
  return <div>El contenido del modal...</div>;
};

export default function Home() {
  const headerOptions = ['Add Character', 'Add Weapon', 'Manage Inventory', 'Manage Priority'];
  const [addCharacterModal, showAddCharacterModal] = useModal();
  const [filterElement, setFilterElement] = useState<string>('');
  const handleClick = () => {
    showAddCharacterModal(true, (onClose) => <Something _onClose={onClose} />);
  };
  const handleFilter = (filter: string) => {
    if (filter === filterElement) {
      setFilterElement('');
    } else {
      setFilterElement(filter);
    }
  };
  type Filter = {
    name: ElementType;
  };
  const filters: Filter[] = [
    {
      name: 'Pyro',
    },
    {
      name: 'Hydro',
    },
    {
      name: 'Geo',
    },
    {
      name: 'Electro',
    },
    {
      name: 'Dendro',
    },
  ];
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-slate-600'>
      <Text variant='title'>Header Buttons</Text>
      <div className='flex'>
        {headerOptions.map((item, index) => {
          return <HeaderButton key={index + item}>{item}</HeaderButton>;
        })}
      </div>
      <Text variant='title'>Minicard</Text>
      <div className='flex'>
        <MiniCard
          name='Hu Tao'
          element='Pyro'
          rarity='5 Stars'
          onClick={() => {
            console.log('Sup dude');
          }}
        />
        <MiniCard
          name='Amber'
          element='Pyro'
          rarity='4 Stars'
          onClick={() => {
            console.log('Epale');
          }}
        />
        <MiniCard
          name='Albedo'
          element='Geo'
          rarity='5 Stars'
          onClick={() => console.log('ez')}
        />
      </div>
      <Text variant='title'>Character Card</Text>
      <div>
        <button onClick={handleClick}>Modal pls</button>
      </div>
      <Text variant='title'>Filter Button</Text>
      <div className='relative flex h-28 w-28 items-center justify-center bg-[#1e2231]'>
        <FilterButton
          image='Cryo'
          onClick={() => handleFilter('Cryo')}
          isActive={'Cryo' === filterElement}
        />
      </div>
      <Text variant='title'>Filter Buttons</Text>
      <div className='flex h-40 w-full items-center justify-center gap-[0.0625rem] bg-[#1e2231]'>
        {filters.map(({ name }, index) => {
          return (
            <FilterButton
              key={name + index}
              image={name}
              isActive={false}
              onClick={() => {
                console.log(name);
              }}
            />
          );
        })}
      </div>
      {addCharacterModal}
    </main>
  );
}

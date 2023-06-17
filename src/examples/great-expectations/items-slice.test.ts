import reducer, {
  add,
  remove,
  toggle,
  markAllAsUnpacked,
  update,
} from './items-slice';

it('returns an empty array as the initial state', () => {
  expect(reducer(undefined, { type: 'noop' })).toEqual([]);
});

it('supports adding an item with the correct name', () => {
  expect.hasAssertions();
  const result = reducer([], add({ name: 'iPhone' }));

  expect(result).toEqual([
    expect.objectContaining({
      name: 'iPhone'
    })
  ])
});

it('prefixes ids with "item-"', () => {
  expect.hasAssertions();
  const result = reducer([], add({ name: 'iPhone' }));

  expect(result).toEqual([
    expect.objectContaining({
      id: expect.stringMatching(/^item-/)
    })
  ])
});

it('defaults new items to a packed status of false', () => {
  expect.hasAssertions();
  const result = reducer([], add({ name: 'iPhone' }));

  expect(result).toEqual([
    expect.objectContaining({
      packed: false
    })
  ])
});

it('supports removing an item', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, remove({ id: '1' }));

  expect(result).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: '1' })
    ])
  )
});

it('supports toggling an item', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, toggle({ id: '1' }));
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: '1', packed: true })
    ])
  )
});

it('supports updating an item', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(
    state,
    update({ id: '1', name: 'Samsung Galaxy S23' }),
  );

  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: '1', name: 'Samsung Galaxy S23' })
    ])
  )
});

it('supports marking all items as unpacked', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: true,
    },
    {
      id: '2',
      name: 'iPhone Charger',
      packed: true,
    },
  ];

  const result = reducer(state, markAllAsUnpacked());
  expect(result).toEqual([
    expect.objectContaining({ packed: false }),
    expect.objectContaining({ packed: false }),
  ])
});

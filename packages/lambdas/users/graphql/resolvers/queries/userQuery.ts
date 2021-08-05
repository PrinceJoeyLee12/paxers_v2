export async function userQuery(_: any, args: any): Promise<any> {
  const { itemId } = args;

  console.log(`Query object with id ${itemId}`);

  return {
    firstItem: 'first',
    secondItem: 'second',
  };
}

export default userQuery;

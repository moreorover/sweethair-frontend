export const useEntityCleaner = () => {
  const clean = (entity) => {
    for (const propName in entity) {
      if (
        entity[propName] == null ||
        entity[propName] === undefined ||
        (entity[propName] instanceof Array && entity[propName].length == 0)
      ) {
        delete entity[propName];
      }
    }

    delete entity.createdOn;
    delete entity.modifiedOn;
    return entity;
  };

  return {
    clean,
  };
};

export default useEntityCleaner;

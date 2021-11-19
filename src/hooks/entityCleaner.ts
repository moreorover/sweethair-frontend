export const useEntityCleaner = () => {
  const clean = (entity: any, emptyString: boolean = false) => {
    for (const propName in entity) {
      if (entity[propName] == null || entity[propName] === undefined) {
        delete entity[propName];
      }
      if (emptyString && entity[propName] === '') {
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

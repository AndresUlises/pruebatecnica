export default function actionCreator(namespace, type) {
  return ({ payload, ...leftoverProps }) => ({
    type: `${namespace} ${type}`,
    payload,
    ...leftoverProps,
  });
}

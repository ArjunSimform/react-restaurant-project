export default function HelloWorld() {
  return (
    <button
      onClick={() => {
        throw new Error(
          'This is your first error! Made by sentry under user name is Arjun Singh Gurjar'
        );
      }}
    >
      Break the world
    </button>
  );
}

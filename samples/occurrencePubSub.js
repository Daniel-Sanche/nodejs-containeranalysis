// sample-metadata:
//   title: Occurrence PubSub
//   description: Polls a specified PubSub subscription for Occurrences.  Requires a subscription to a topic named 'container-analysis-occurrences-v1beta'
//   usage: node occurrencePubSub.js "project-id" "subscription-id" "timeout-in-seconds"
async function main(
  projectId = 'your-project-id', // Your GCP Project ID
  subscriptionId = 'my-sub-id', // A user-specified subscription to the 'container-analysis-occurrences-v1beta' topic
  timeoutSeconds = 30 // The number of seconds to listen for the new Pub/Sub messages
) {
  // [START containeranalysis_pubsub]
  /**
   * TODO(developer): Uncomment these variables before running the sample
   */
  // const projectId = 'your-project-id', // Your GCP Project ID
  // const subscriptionId = 'my-sub-id', // A user-specified subscription to the 'container-analysis-occurrences-v1beta' topic
  // const timeoutSeconds = 30 // The number of seconds to listen for the new Pub/Sub Messages

  // Import the pubsub library and create a client, topic and subscription
  const {PubSub} = require('@google-cloud/pubsub');
  const pubsub = new PubSub({projectId});
  const subscription = pubsub.subscription(subscriptionId);

  // Handle incoming Occurrences using a Cloud Pub/Sub subscription
  let count = 0;
  const messageHandler = message => {
    count++;
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on(`message`, messageHandler);

  setTimeout(() => {
    subscription.removeListener(`message`, messageHandler);
    console.log(`Polled ${count} occurrences`);
  }, timeoutSeconds * 1000);
  // [END containeranalysis_pubsub]
}

main(...process.argv.slice(2));

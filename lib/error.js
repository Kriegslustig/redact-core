Redact.error = function RedactError (name/*, rest*/) {
  var error = new Meteor.Error(
    'Redact.' + name,
    (Redact.errors[name] || Redact.defaultError).apply(null, _.rest(arguments))
  )
  if(Meteor.isClient) console.error(error)
  return error
}

Redact.defaultError = function () {
  return [
    'An error occured inside Redact. These parameters were passed: (',
    [].join.call(arguments, ', '),
    ')'
  ].join('')
}

Redact.errors = {
  noSuchElement (element, document) {
    return [
      'No elment with id',
      element,
      'in document',
      document
    ].join(' ')
  },

  'Redact.ElementMissingKey' (key, element) {
    return [
      'Missing key,',
      key,
      'in element',
      EJSON.stringify(element)
    ].join(' ')
  },

  missingCollectionInTemplate: function () {
    return 'You need to define a collection when rendering redactEditor. Like so {{ redactEditor doc=y collection=myCollection }}'
  },

  updateFailed () {
    console.error(arguments)
    return 'Failed to update the document'
  }
}

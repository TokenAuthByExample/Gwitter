from rest_framework.renderers import JSONRenderer

def get_query_params(request):
    if hasattr(request, 'query_params'):
        params = request.query_params
    else:
        params = request.QUERY_PARAMS

    return params

class JSONPRenderer(JSONRenderer):
    """
    uses JSON renderer and wraps it all up in a callback
    """

    media_type = 'application/javascript'
    format = 'jsonp'
    callback_parameter = 'callback'
    default_callback = 'callback'
    charset = 'utf-8'

    def get_callback(self, renderer_context):
        """
        get the name of the callback from the query_params
        """
        request = renderer_context.get('request', None)
        params = request and get_query_params(request) or {}
        return params.get(self.callback_parameter, self.default_callback)

    def render(self, data, accepted_media_type=None, renderer_context=None):
        """
        ?callback=my_callback
        """
        renderer_context = renderer_context or {}
        callback = self.get_callback(renderer_context)
        json = super(JSONPRenderer, self).render(data,
                                                 accepted_media_type,
                                                 renderer_context)
        return callback.encode(self.charset) + b'(' + json + b');'

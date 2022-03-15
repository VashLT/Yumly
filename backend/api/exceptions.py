from rest_framework.views import exception_handler

def custom_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        raise Exception('Empty response!')

    response.data = {
        'message' : response.data['detail'], #type: ignore
        'status_code': response.status_code
    }

    return response
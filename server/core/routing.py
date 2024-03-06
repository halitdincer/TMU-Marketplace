from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path
from consumers import ChatConsumer

application = ProtocolTypeRouter({
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                [
                    path('chat/', ChatConsumer),
                ]
            )
        )
    )
})

# Source: https://medium.com/@bazaee.hassan/socketio-django-kotlin-501e2c3d4eeb
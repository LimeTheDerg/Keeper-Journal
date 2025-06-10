from rest_framework import permissions as perms

class AnonymousOrAuthenticated(perms.BasePermission):
    def has_permission(self, request, view):
        # Only permit the creation of new users
        # The other methods are only permitted to be performed by authenticated users
        if request.user and request.user.is_authenticated:
            return True
        elif request.method == "POST":
            return True
        else:
            return False
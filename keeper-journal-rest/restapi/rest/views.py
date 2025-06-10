from restapi.rest.models        import Entry
from rest_framework.views       import APIView
from rest_framework.response    import Response
from restapi.rest.serializers   import EntrySerializer, UserSerializer
from rest_framework             import status
from django.http                import Http404
from django.contrib.auth.models import User
from rest_framework             import permissions
from restapi.rest.permissions   import AnonymousOrAuthenticated
from rest_framework.pagination  import PageNumberPagination

class EntryListView(APIView):

    permission_classes = [permissions.IsAuthenticated] # Only authenticated viewers can see this view

    def get(self, request, format=None):
        # Filter the entries by the user in the request so that only the creator of an entry can see it
        entries = Entry.objects.filter(user_id=request.user.id).order_by("created_at").reverse()

        # Initialize the pagination
        paginator = PageNumberPagination()
        paginator.page_size = 10

        # Prepare the paginated dataset
        result_page = paginator.paginate_queryset(entries, request)

        serializer = EntrySerializer(result_page, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):

        # Inject the user_id from the authentication info
        newdata = request.data.copy()
        newdata["user"] = request.user.id

        # Serialize the info
        serializer = EntrySerializer(data=newdata)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        # Return BAD_REQUEST if the data was invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EntryDetailView(APIView):

    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self, pk):
        # Attempt to retrieve en entry by its primary key
        # Return 404 if the item does not exist
        try:
            return Entry.objects.get(id=pk)
        except:
            return Http404

    def get(self, request, pk, format=None):

        # Return the entry in JSON format
        entry = self.get_object(pk)
        serializer = EntrySerializer(entry)

        if (entry == Http404):
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Only permit viewing if the user is the owner of that entry
        if (request.user.id == entry.user_id):
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def put(self, request, pk, format=None):

        newdata = request.data.copy()
        newdata["user"] = request.user.id

        # Updating a specific entry
        entry = self.get_object(pk)
        serializer = EntrySerializer(entry, data=newdata)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        # Return BAD_REQUEST if the data was invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        # Deleting entries
        entry = self.get_object(pk)
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AuthenticatedView(APIView):
    
    permission_classes = [AnonymousOrAuthenticated] # Unauthenticated users can only use the POST method, and cannot authenticate with the frontend

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        # Return BAD_REQUEST if the data was invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        # Return BAD_REQUEST if the data was invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = User.objects.get(id=request.user.id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
